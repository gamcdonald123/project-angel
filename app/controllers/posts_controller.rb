class PostsController < ApplicationController
  # def index
  #   @community = Community.find(params[:community_id])
  #   @posts = @community.posts
  # end

  def show
    @post = Post.find(params[:id])
    @comment = Comment.new
  end

  # def new
  #   @community = Community.find(params[:community_id])
  #   @post = Post.new
  # end

  def create
    @post = Post.new(post_params)
    @community = Community.find(params[:community_id])
    @post.community = @community
    @post.user = current_user
    if @post.save!
      redirect_to community_path(@community)
    else
      render :new
    end
  end

  def like
    @post = Post.find(params[:id])
    @comment = Comment.new
    if current_user.voted_up_for? @post
      @post.unliked_by current_user
    else
      @post.liked_by current_user
    end
    redirect_to post_path(@post)
  end

  private

  def post_params
    params.require(:post).permit(:title, :content)
  end
end
