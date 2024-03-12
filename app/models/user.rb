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
<<<<<<< HEAD
  has_one :profile

  after_create :create_user_profile

private

  def create_user_profile
    create_profile
  end
=======
  has_many :comments
  has_many :comments, through: :posts
>>>>>>> 1b80e6f3545c56a968ca19846fe08b3439f6ce7a
end
