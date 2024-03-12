class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :reports
  has_many :posts
  has_many :communities, through: :posts
  has_many :messages
  has_one_attached :photo
  has_one :profile
  has_many :comments
  has_many :comments, through: :posts

  after_create :create_user_profile

private

  def create_user_profile
    create_profile
  end
end
