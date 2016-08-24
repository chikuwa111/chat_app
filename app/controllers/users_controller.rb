class UsersController < ApplicationController
  before_action :authenticate_user!, only: [:show, :find]

  def home
  end

  def show
    @user = User.find(params[:id])
  end

  def find
  end
end
