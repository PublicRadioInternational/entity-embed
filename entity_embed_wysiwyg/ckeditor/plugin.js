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
                '<a style="cursor:pointer" id="edit-entity-unevented" data-entity="',
                window.entity_embed_wysiwyg_entity.id,
                '" data-entity-type="',
                window.entity_embed_wysiwyg_entity.type,
                '">[[entity_id:"',
                window.entity_embed_wysiwyg_entity.id,
                '" entity_type:"',
                window.entity_embed_wysiwyg_entity.type,
                '" entity_title:"',
                window.entity_embed_wysiwyg_entity.title,
                '"]]</a>'
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
          close: function() {
            destroyCKE();
          },
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

      // Launch modal when edit-entity is clicked.
      var launchModalOnClick = function(element) {
        if (element) {
          editor.editable().attachListener(element, 'click', function() {
            var $this = $(this.$),
                data = $this.data();

            // Set ID to edit-entity.
            $this.attr('id', 'edit-entity');

            // Pass data to dialog.
            window.entity_embed_wysiwyg_entity_edit = {
              id: data['entity'],
              type: data['entity-type']
            }

            var dialog = new CKEDITOR.dialog(editor, 'edit_entity');
            dialog.show();
          });
        }
      };

      // Add listener to editor.
      editor.on('contentDom', function() {
        var element = editor.document.getById('edit-entity');
        launchModalOnClick(element);
      });
      editor.on('change', function() {
        var element = editor.document.getById('edit-entity-unevented');
        launchModalOnClick(element);
      });
    }
  });

})(jQuery);
