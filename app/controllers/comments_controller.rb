class CommentsController < ApplicationController

  # def index
  #   @post = Post.find(params[:post_id])
  #   @comments = @post.comments
  # end

  # def show
  #   @comment = Comment.find(params[:id])
  #   @comment.user = current_user
  #   @comment.post = Post.find(params[:post_id])
  # end

  def create
    @comment = Comment.new(comment_params)
    @comment.user = current_user
    @comment.post = Post.find(params[:post_id])
    if @comment.save
      redirect_to post_path(@comment.post)
    else
      render 'posts/show'
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:content, :user_id, :post_id)
  end

end
