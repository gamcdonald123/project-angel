require "test_helper"

class CrimesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get crimes_index_url
    assert_response :success
  end

  test "should get show" do
    get crimes_show_url
    assert_response :success
  end
end
