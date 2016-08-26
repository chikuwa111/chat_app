class Message < ActiveRecord::Base
  belongs_to :from_user, class_name: 'User'
  belongs_to :to_user, class_name: 'User'

  validates :contents, presence: true
  validates :from_user_id, presence: true
  validates :to_user_id, presence: true

  def timestamp
    self.created_at.strftime('%Y/%m/%d %H:%M')
  end
end
