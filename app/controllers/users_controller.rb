class UsersController < ApplicationController
  before_action :authenticate_user!, only: [:show, :find]

  def home
  end

  def index
  end

  def find
  end
end
