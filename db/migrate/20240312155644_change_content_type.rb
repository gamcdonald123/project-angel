class ChangeContentType < ActiveRecord::Migration[7.1]
  def change
    change_column :comments, :content, :text
  end
end
