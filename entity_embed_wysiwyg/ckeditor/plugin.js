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
            if ('entity_embed_wysiwyg_entity' in window) {
              var embedString = [
                '<a style="cursor:pointer" class="edit-entity" data-entity="',
                window.entity_embed_wysiwyg_entity.id,
                '" data-entity-type="',
                window.entity_embed_wysiwyg_entity.type,
                '">[[entity_id:',
                window.entity_embed_wysiwyg_entity.id,
                ' entity_type:',
                window.entity_embed_wysiwyg_entity.type,
                ' entity_title:',
                window.entity_embed_wysiwyg_entity.title,
                ']]</a>'
              ].join('');
              editor.insertHtml(embedString);
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

      // Create a command for launching the select form.
      editor.addCommand('launch_entity_embed_select', new CKEDITOR.dialogCommand('select_entity'));

      // Create a Dialog that loads an edit form for embeded entities.
      CKEDITOR.dialog.add('edit_entity', function (editor) {
        return {
          title: Drupal.t('Edit an Entity'),
          minWidth: 700,
          minHeight: 400,
          buttons: [],
          contents: [{
            id: 'entity-embed-edit',
            label: Drupal.t('Edit an Entity'),
            expand: true,
            elements: [{
              type: 'iframe',
              src: Drupal.settings.basePath + 'admin/config/content/wysiwyg/entity_embed/entity_edit/' + window.entity_embed_wysiwyg_entity_edit.id + '/' + window.entity_embed_wysiwyg_entity_edit.type,
              width: '100%',
              height: '400px'
            }]
          }]
        };
      });

      // Create a command for launching the edit form.
      editor.addCommand('launch_entity_embed_edit', new CKEDITOR.dialogCommand('edit_entity'));

      // Create our button.
      editor.ui.addButton('entity_embed_wysiwyg_add_token', {
        label: Drupal.t('Entity Embed Select View'),
        command: 'launch_entity_embed_select',
        icon: this.path + 'add_embed_token.png'
      });
    }
  });

  // Loop through instanes, on change bind event to anchors.
  for (var instance in CKEDITOR.instances) {
    CKEDITOR.instances[instance].on('change', function() {
      $('iframe.cke_wysiwyg_frame').contents().find('a.edit-entity').bind('click', function() {
        var data = $(this).data();
        window.entity_embed_wysiwyg_entity_edit = {
          id: data['entity'],
          type: data['entity-type']
        }

        CKEDITOR.instances[instance].commands.launch_entity_embed_edit.exec();
      });
    });
  }
})(jQuery);
