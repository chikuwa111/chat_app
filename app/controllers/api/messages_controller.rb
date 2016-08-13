module Api
  class MessagesController < ApplicationController

    def index
      @messages = Message.all
      render json: @messages
    end

    def create
      @message = Message.create(contents: params[:contents])
      redirect_to root_url
    end

    private

      def message_params
        params.require(:message).permit(:contents)
      end

  end

end
