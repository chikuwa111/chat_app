class UsersController < ApplicationController
  before_action :authenticate_user!, only: [:index, :find]

  def home
  end

  def index
  end

  def find
  end
end
