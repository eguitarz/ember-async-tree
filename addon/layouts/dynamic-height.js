
import ShelfFirst from 'layout-bin-packer/shelf-first';

export default class DynamicHeightGrid
{
  constructor(content, options) {
    this.content = content;
    this.width = options.width;
    this.indentation = options.indentation;
    this.$ = options.element;
    this.bin = new ShelfFirst(content, options.width);
  }

  contentSize(clientWidth/*, clientHeight*/) {
    return {
      width: clientWidth,
      height: this.bin.height(clientWidth)
    };
  }

  indexAt(offsetX, offsetY, width, height) {
    return this.bin.visibleStartingIndex(offsetY, width, height);
  }

  positionAt(index, width, height) {
    return this.bin.position(index, width, height);
  }

  widthAt(index) {
    return this.width;
  }

  heightAt(index) {
    let { id } = this.content[index];
    if (this.$) {
      return this.$.find(`#${id}`).height();
    }
  }

  count(offsetX, offsetY, width, height) {
    return this.bin.numberVisibleWithin(offsetY, width, height, true);
  }

  maxScroll(width, height) {
    return this.bin.maxContentOffset(width, height);
  }
}
