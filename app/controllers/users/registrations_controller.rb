class Users::RegistrationsController < Devise::RegistrationsController
  before_filter :configure_sign_up_params, only: [:create]
  before_filter :configure_account_update_params, only: [:update]

  # PUT /users
  def update
    file = params[:user][:picture]
    current_user.set_image(file)
    if current_user.update_with_password(user_params)
      flash[:notice] = 'Successfully updated!'
      respond_with resource, location: after_update_path_for(resource)
    else
      render :edit
    end
  end

  protected

    # If you have extra params to permit, append them to the sanitizer.
    def configure_sign_up_params
      devise_parameter_sanitizer.for(:sign_up) << :name
    end

    # If you have extra params to permit, append them to the sanitizer.
    def configure_account_update_params
      devise_parameter_sanitizer.for(:account_update) << [:name, :picture]
    end

    def after_update_path_for(resource)
      user_path(current_user)
    end

  private

    def user_params
      params.require(:user).permit(:name, :email, :password,
              :password_confirmation, :current_password)
    end
end
