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

  validates :name, presence: true
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :rememberable, :validatable

  def friends
    friends_of_from_user + friends_of_to_user
  end

  def messages
    received_messages + sent_messages
  end
end
