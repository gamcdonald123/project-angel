class AddUserReferencesToChatrooms < ActiveRecord::Migration[7.1]
  def change
    add_reference :chatrooms, :sender, null: false
    add_reference :chatrooms, :receiver, null: false
    add_foreign_key :chatrooms, :users, column: :sender_id
    add_foreign_key :chatrooms, :users, column: :receiver_id
  end
end
