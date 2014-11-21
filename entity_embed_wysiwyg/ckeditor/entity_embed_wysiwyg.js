/**
 * @file
 * JavaScript that gets loaded in embed dialog and handles events.
 */
'use strict';
(function ($) {
  Drupal.behaviors.entity_embed_wysiwyg = {
    attach: function(context) {
      $('.view-content tr', context).click(function() {
        var $this = $(this);
        $('.view-content tr').removeClass('selected-entity');
        $this.addClass('selected-entity');
        window.parent.entity_embed_wysiwyg_entity = {
          id: $this.find('.entity_id').text().trim(),
          type: $this.find('.entity_type').text().trim(),
          title: $this.find('.entity_title').text().trim()
        }
      });
    }
  }
})(jQuery);
