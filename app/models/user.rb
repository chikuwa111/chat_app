class User < ActiveRecord::Base
  has_many :friendships_of_from_user, class_name: 'Friendship',
            foreign_key: 'from_user_id', dependent: :destroy
  has_many :friendships_of_to_user, class_name: 'Friendship',
            foreign_key: 'to_user_id', dependent: :destroy
  has_many :friends_of_from_user, through: :friendships_of_from_user,
            source: 'to_user'
  has_many :friends_of_to_user, through: :friendships_of_to_user,
            source: 'from_user'

  has_many :received_messages, class_name: 'Message',
            foreign_key: 'to_user_id', dependent: :destroy
  has_many :sent_messages, class_name: 'Message',
            foreign_key: 'from_user_id', dependent: :destroy

  has_many :accesses_of_from_user, class_name: 'Access',
            foreign_key: 'from_user_id', dependent: :destroy
  has_many :accesses_of_to_user, class_name: 'Access',
            foreign_key: 'to_user_id', dependent: :destroy

  validates :name, presence: true
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :rememberable, :validatable

  def set_image(file)
    if !file.nil?
      file_name = Time.now().to_i.to_s + file.original_filename
      File.open("public/user_image/#{file_name}", 'wb') {
        |f| f.write(file.read)
      }
      self.picture = file_name
    end
  end

  def friends
    friends_of_from_user + friends_of_to_user
  end

  def messages
    received_messages + sent_messages
  end

  def friend?(user)
    friendship = self.friendships_of_from_user.find_by(to_user_id: user.id)
    inverse_friendship = self.friendships_of_to_user.find_by(from_user_id: user.id)
    friendship || inverse_friendship
  end

  def destroy_friendship_with(user_id)
    if friendship = self.friendships_of_from_user.find_by(to_user_id: user_id)
      friendship.destroy
    elsif inverse_friendship = self.friendships_of_to_user.find_by(from_user_id: user_id)
      inverse_friendship.destroy
    end
  end

  def friendship_with(user_id)
    if friendship = self.friendships_of_from_user.find_by(to_user_id: user_id)
      return friendship
    else
      inverse_friendship = self.friendships_of_to_user.find_by(from_user_id: user_id)
      return inverse_friendship
    end
  end

  def access_with(user_id)
    if access = self.accesses_of_from_user.find_by(to_user_id: user_id)
      return access
    else
      inverse_access = self.accesses_of_to_user.find_by(from_user_id: user_id)
      return inverse_access
    end
  end

  def last_action_with(user)
    if (m = Message.where("from_user_id = :user1 and to_user_id = :user2",
                      user1: user.id, user2: self.id).last)
      last_action = m
    end

    if (m = Message.where("from_user_id = :user1 and to_user_id = :user2",
                      user1: self.id, user2: user.id).last)
      if !last_action || last_action.id < m.id
        last_action = m
      end
    end

    if !last_action
      last_action = user.friendship_with(self.id)
    end

    return last_action
  end

  def last_action_timestamp_with(user)
    self.last_action_with(user).created_at.strftime('%Y/%m/%d %H:%M')
  end

  def last_access_of(user)
    access = self.access_with(user)
    if access.from_user_id == user.id
      return access.from_user_access
    else
      return access.to_user_access
    end
  end

end
