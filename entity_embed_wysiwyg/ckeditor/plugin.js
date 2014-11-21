/**
 * @file
 * JavaScript that defines the entity_embed_wysiwyg_add_token
 * button and handles events.
 */
'use strict';
(function($) {
  CKEDITOR.plugins.add('entity_embed_wysiwyg_plugin', {
    requires: ['iframedialog'],
    init: function(editor) {

      // Create Dialog that allows users to select entities that should be embedded.
      CKEDITOR.dialog.add('select_entity', function (editor) {
        return {
          title: Drupal.t('Embed an Entity'),
          minWidth: 700,
          minHeight: 400,
          onOk: function() {
            if ('entity_embed_wysiwyg_entity_id' in window) {
              editor.insertHtml('<div class="embed">[[entity_id:' + window.entity_embed_wysiwyg_entity_id + ']]</div>');
            }
          },
          contents: [{
            id: 'entity-embed-select',
            label: Drupal.t('Embed an Entity'),
            expand: true,
            elements: [{
              type: 'iframe',
              src: Drupal.settings.basePath + 'admin/config/content/wysiwyg/entity_embed/select',
              width: '100%',
              height: '400px'
            }]
          }]
        };
      });

      // Create our command for launching the node edit form.
      editor.addCommand('launch_entity_embed_select', new CKEDITOR.dialogCommand('select_entity'));

      // Create our button.
      editor.ui.addButton('entity_embed_wysiwyg_add_token', {
        label: Drupal.t('Entity Embed Select View'),
        command: 'launch_entity_embed_select',
        icon: this.path + 'add_embed_token.png'
      });
    }
  });
})(jQuery);
