class AddPhotos < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :photos, :string
  end
end
