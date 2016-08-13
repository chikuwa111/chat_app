class Message < ActiveRecord::Base
  validates :contents, presence: true
end
