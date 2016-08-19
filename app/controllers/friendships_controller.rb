class FriendshipsController < ApplicationController
  before_action :logged_in

  def create
  end

  def destroy
  end

  private

    def logged_in
      if !(user_signed_in?)
        flash[:alert] = "You need to login."
        redirect_to new_user_session_url
      end
    end
end
