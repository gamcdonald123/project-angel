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

  def like
    @post = Post.find(params[:post_id])
    comment = Comment.find(params[:id])
    if current_user.voted_up_for? comment
      comment.unliked_by current_user
    else
      comment.liked_by current_user
    end
    redirect_to post_path(@post)
  end

  private

  def comment_params
    params.require(:comment).permit(:content, :user_id, :post_id)
  end

end
