module Api
  class MessagesController < ApplicationController
    protect_from_forgery :except => [:index, :create]

    def index
      @messages = current_user.messages.sort_by{|message| message.id}
      render json: @messages
    end

    def create
      @message = Message.new(contents: params[:contents],
                              from_user_id: current_user.id,
                              to_user_id: params[:to_user_id])
      file = params[:image]
      if !file.nil?
        file_name =  Time.now().to_i.to_s + file.original_filename
        File.open("public/message_image/#{file_name}", 'wb') {
          |f| f.write(file.read)
        }
        @message.image = file_name
      end
      @message.save
      render json: @message
    end

    private

      def message_params
        params.require(:message).permit(:contents, :to_user_id)
      end

  end

end
