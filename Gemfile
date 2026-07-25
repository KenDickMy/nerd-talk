source "https://rubygems.org"

# Matches the gem set GitHub Pages runs on its legacy build servers.
gem "github-pages", group: :jekyll_plugins

group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
  gem "jekyll-paginate"
end

gem "webrick", "~> 1.7"

# System Ruby on macOS is 2.6; pin native deps that dropped support for it.
gem "ffi", "< 1.17"
gem "google-protobuf", "< 3.25"

