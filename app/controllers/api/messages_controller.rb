module Api
  class MessagesController < ApplicationController

    def index
      @messages = current_user.messages.sort_by{|message| message.id}
      render json: @messages
    end

    def create
      @message = Message.new(message_params)
      @message.from_user_id = current_user.id
      # この辺はMessageモデルに移すと綺麗かな
      file = params[:image]
      if !file.nil?
        file_name =  Time.now().to_i.to_s + file.original_filename
        File.open("public/message_image/#{file_name}", 'wb') {
          |f| f.write(file.read)
        }
        @message.image = file_name
        @message.contents = "sent image"
      end
      @message.save
      render json: {message: @message, timestamp: @message.timestamp}
    end

    private

      def message_params
        params.permit(:contents, :to_user_id)
      end

  end

end
