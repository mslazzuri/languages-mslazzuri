# regex_spec.rb
RSpec.describe 'Regular Expression Matcher' do
  let(:pattern) { /\A((([1-9]\d*|0)(?:ll|LL|ull|uLL|llu|LLu|l|L|u)?)|(0[0-7]+)|(0x[a-fA-F0-9]+)|(0[bB][01]+))\z/ }
  let(:should_pass) { ['0', '23746', '06235', '0b01101', '0xa23f', '123llu'] }
  let(:should_fail) { ['09', '0.2343', 'MATHEUS'] }

  describe 'should pass' do
    it 'matches all expected strings' do
      should_pass.each do |str|
        expect(str).to match(pattern)
      end
      puts "\nAll 'should pass' tests passed"
    end
  end

  describe 'should fail' do
    it 'does not match any of the strings' do
      should_fail.each do |str|
        expect(str).not_to match(pattern)
      end
      puts "\nAll 'should fail' tests passed"
    end
  end
end
