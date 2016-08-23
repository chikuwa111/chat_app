class UsersController < ApplicationController
  before_action :logged_in, only: [:index, :find]

  def home
  end

  def index
  end

  def find
  end

  private

  # これはdeviseの用意してるauthenticate_user!でいけるかな？
    def logged_in
      if !(user_signed_in?)
        flash[:alert] = "You need to login."
        redirect_to new_user_session_url
      end
    end
end
