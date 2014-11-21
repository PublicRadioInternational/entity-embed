<?php
/**
 * @file
 * Defines an administration page for entity_embed_wysiwyg.
 */

/**
 * Implements hook_form().
 */
function entity_embed_wysiwyg_admin_form($form, &$form_state) {
  $views = views_get_all_views();
  $view_options = array();
  foreach ($views as $view) {
    $view_options[$view->name] = $view->name;
  }

  $form['entity_embed_wysiwyg_view'] = array(
    '#type' => 'select',
    '#options' => $view_options,
    '#title' => t('Entity Embed Select View'),
    '#default_value' => variable_get('entity_embed_wysiwyg_view', 'entity_embed_wysiwyg_select_view'),
    '#description' => t('View that should be used to select embeddable entities. Selected view should be a table that has an "Entity ID" field with a class of "entity_id".'),
  );

  return system_settings_form($form);
}
