module UsersHelper

  def image_for(user_picture)
    if user_picture
      image_tag "/user_image/#{user_picture}"
    else
      image_tag "/default_user_image/default.png"
    end
  end
end
