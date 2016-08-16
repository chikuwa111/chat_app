class UsersController < ApplicationController
  before_action :logged_in, only: :index

  def index
  end

  private

    def logged_in
      if !(user_signed_in?)
        flash[:alert] = "You need to login."
        redirect_to new_user_session_url
      end
    end
end
