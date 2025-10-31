# Jekyll plugin to normalize accents in auto-generated Kramdown heading IDs
# This adds accent removal to Kramdown's ID generation

Jekyll.logger.info "Loading normalize_ids plugin..."

module KramdownNormalizeIds
  # Normalize Spanish/European accents to ASCII equivalents
  ACCENT_MAP = {
    'á' => 'a', 'é' => 'e', 'í' => 'i', 'ó' => 'o', 'ú' => 'u',
    'à' => 'a', 'è' => 'e', 'ì' => 'i', 'ò' => 'o', 'ù' => 'u',
    'â' => 'a', 'ê' => 'e', 'î' => 'i', 'ô' => 'o', 'û' => 'u',
    'ã' => 'a', 'õ' => 'o',
    'ä' => 'a', 'ë' => 'e', 'ï' => 'i', 'ö' => 'o', 'ü' => 'u',
    'ç' => 'c',
    'ñ' => 'n',
    'Á' => 'A', 'É' => 'E', 'Í' => 'I', 'Ó' => 'O', 'Ú' => 'U',
    'À' => 'A', 'È' => 'E', 'Ì' => 'I', 'Ò' => 'O', 'Ù' => 'U',
    'Â' => 'A', 'Ê' => 'E', 'Î' => 'I', 'Ô' => 'O', 'Û' => 'U',
    'Ã' => 'A', 'Õ' => 'O',
    'Ä' => 'A', 'Ë' => 'E', 'Ï' => 'I', 'Ö' => 'O', 'Ü' => 'U',
    'Ç' => 'C',
    'Ñ' => 'N'
  }.freeze

  # Convert accented text to normalized ASCII
  def self.normalize(text)
    text = text.dup
    ACCENT_MAP.each { |accent, normal| text.gsub!(accent, normal) }
    text
  end
end

# Hook into Jekyll's post_render to normalize IDs
Jekyll::Hooks.register :site, :post_render do |site|
  # Process all pages and documents
  (site.pages + site.documents).each do |page|
    next unless page.output_ext == '.html'
    next unless page.output
    
    # Normalize all heading IDs in the HTML
    page.output.gsub!(/id="([^"]*)"/) do |match|
      id = $1
      normalized_id = KramdownNormalizeIds.normalize(id)
      "id=\"#{normalized_id}\""
    end
    
    # Also normalize href links to headings
    page.output.gsub!(/href="#([^"]*)"/) do |match|
      anchor = $1
      normalized_anchor = KramdownNormalizeIds.normalize(anchor)
      "href=\"##{normalized_anchor}\""
    end
  end
end
