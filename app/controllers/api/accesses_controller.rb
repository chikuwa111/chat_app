module Api
  class AccessesController < ApplicationController

    def update
      access = current_user.access_with(params[:to_user_id])
      if access.from_user_id == current_user.id
        access.update_attribute(:from_user_access, params[:datetime])
      else
        access.update_attribute(:to_user_access, params[:datetime])
      end
      render text: ''
    end
  end
end