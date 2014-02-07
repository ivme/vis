/**
 * @constructor Item
 * @param {ItemSet} parent
 * @param {Object} data             Object containing (optional) parameters type,
 *                                  start, end, content, group, className.
 * @param {Object} [options]        Options to set initial property values
 * @param {Object} [defaultOptions] default options
 *                                  // TODO: describe available options
 */
function Item (parent, data, options, defaultOptions) {
  this.parent = parent;
  this.data = data;
  this.dom = null;
  this.options = options || {};
  this.defaultOptions = defaultOptions || {};

  this.selected = false;
  this.visible = false;
  this.top = 0;
  this.left = 0;
  this.width = 0;
  this.height = 0;
  this.offset = 0;
}

/**
 * Select current item
 */
Item.prototype.select = function select() {
  this.selected = true;
  if (this.visible) this.repaint();
};

/**
 * Unselect current item
 */
Item.prototype.unselect = function unselect() {
  this.selected = false;
  if (this.visible) this.repaint();
};

/**
 * Show the Item in the DOM (when not already visible)
 * @return {Boolean} changed
 */
Item.prototype.show = function show() {
  return false;
};

/**
 * Hide the Item from the DOM (when visible)
 * @return {Boolean} changed
 */
Item.prototype.hide = function hide() {
  return false;
};

/**
 * Repaint the item
 * @return {Boolean} changed
 */
Item.prototype.repaint = function repaint() {
  // should be implemented by the item
  return false;
};

/**
 * Reflow the item
 * @return {Boolean} resized
 */
Item.prototype.reflow = function reflow() {
  // should be implemented by the item
  return false;
};

/**
 * Give the item a display offset in pixels
 * @param {Number} offset    Offset on screen in pixels
 */
Item.prototype.setOffset = function setOffset(offset) {
  this.offset = offset;
};

/**
 * Repaint a delete button on the top right of the item when the item is selected
 * @param {HTMLElement} anchor
 * @private
 */
Item.prototype._repaintDeleteButton = function (anchor) {
  // show/remove delete button
  if (this.selected && !this.dom.deleteButton) {
    var parent = this.parent;
    var id = this.id;
    this.dom.deleteButton = Item.createDeleteButton(function () {
      parent.removeItem(id);
    });
    anchor.appendChild(this.dom.deleteButton);
  }
  else if (!this.selected && this.dom.deleteButton) {
    if (this.dom.deleteButton.parentNode) {
      this.dom.deleteButton.parentNode.removeChild(this.dom.deleteButton);
    }
    this.dom.deleteButton = null;
  }
};

/**
 * Create a delete button which can be attached to this item
 * @param {function} callback    Called when the button is clicked
 * @returns {HTMLElement} deleteButton
 */
Item.createDeleteButton = function createDeleteButton (callback) {
  var button = document.createElement('div');
  button.className = 'delete';

  Hammer(button, {
    preventDefault: true
  }).on('tap', callback);

  return button;
};
