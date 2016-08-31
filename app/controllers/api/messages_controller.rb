module Api
  class MessagesController < ApplicationController

    def index
      @messages = current_user.messages.sort_by{|message| message.id}
      render json: @messages
    end

    def create
      @message = Message.new(message_params)
      @message.from_user_id = current_user.id
      @message.applyImage(params[:image])
      @message.save
      render json: {message: @message, timestamp: @message.timestamp}
    end

    private

      def message_params
        params.permit(:contents, :to_user_id)
      end

  end

end
