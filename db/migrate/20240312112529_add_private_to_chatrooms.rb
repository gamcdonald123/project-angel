class AddPrivateToChatrooms < ActiveRecord::Migration[7.1]
  def change
    add_column :chatrooms, :private, :boolean, default: false
  end
end
