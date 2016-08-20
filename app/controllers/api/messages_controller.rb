module Api
  class MessagesController < ApplicationController
    protect_from_forgery :except => [:index, :create]

    def index
      @messages = current_user.messages.sort_by{|message| message.id}
      render json: @messages
    end

    def create
      @message = Message.create(contents: params[:contents],
                                from_user_id: current_user.id,
                                to_user_id: params[:to_user_id])
      redirect_to root_url
    end

    private

      def message_params
        params.require(:message).permit(:contents, :to_user_id)
      end

  end

end
