class Message < ActiveRecord::Base
  belongs_to :from_user, class_name: 'User'
  belongs_to :to_user, class_name: 'User'

  validates :contents, presence: true
  validates :from_user_id, presence: true
  validates :to_user_id, presence: true

  def set_image(file)
    if !file.nil?
      file_name =  Time.now().to_i.to_s + file.original_filename
      File.open("public/message_image/#{file_name}", 'wb') {
        |f| f.write(file.read)
      }
      self.image = file_name
      self.contents = "sent image"
    end
  end

  def timestamp
    self.created_at.strftime('%Y/%m/%d %H:%M')
  end
end
