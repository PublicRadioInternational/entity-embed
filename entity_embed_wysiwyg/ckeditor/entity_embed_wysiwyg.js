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
        window.parent.entity_embed_wysiwyg_entity_id = $this.find('.entity_id').text().trim();
      });
    }
  }
})(jQuery);
