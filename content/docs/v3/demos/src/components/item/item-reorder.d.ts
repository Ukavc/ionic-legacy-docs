import { ElementRef, EventEmitter, NgZone, Renderer } from '@angular/core';
import { Content } from '../content/content';
import { ItemReorderGesture } from '../item/item-reorder-gesture';
export declare class ReorderIndexes {
    from: number;
    to: number;
    constructor(from: number, to: number);
    applyTo(array: any): void;
}
/**
 * @name ItemReorder
 * @description
 * Item reorder adds the ability to change an item's order in a group.
 * It can be used within an `ion-list` or `ion-item-group` to provide a
 * visual drag and drop interface.
 *
 * ## Grouping Items
 *
 * All reorderable items must be grouped in the same element. If an item
 * should not be reordered, it shouldn't be included in this group. For
 * example, the following code works because the items are grouped in the
 * `<ion-list>`:
 *
 *  ```html
 *  <ion-list reorder="true">
 *    <ion-item *ngFor="let item of items">{% raw %}{{ item }}{% endraw %}</ion-item>
 *  </ion-list>
 *  ```
 *
 * However, the below list includes a header that shouldn't be reordered:
 *
 *  ```html
 *  <ion-list reorder="true">
 *    <ion-list-header>Header</ion-list-header>
 *    <ion-item *ngFor="let item of items">{% raw %}{{ item }}{% endraw %}</ion-item>
 *  </ion-list>
 *  ```
 *
 * In order to mix different sets of items, `ion-item-group` should be used to
 * group the reorderable items:
 *
 *  ```html
 *  <ion-list>
 *    <ion-list-header>Header</ion-list-header>
 *    <ion-item-group reorder="true">
 *      <ion-item *ngFor="let item of items">{% raw %}{{ item }}{% endraw %}</ion-item>
 *    </ion-item-group>
 *  </ion-list>
 *  ```
 *
 * It's important to note that in this example, the `[reorder]` directive is applied to
 * the `<ion-item-group>` instead of the `<ion-list>`. This way makes it possible to
 * mix items that should and shouldn't be reordered.
 *
 *
 * ## Implementing the Reorder Function
 *
 * When the item is dragged and dropped into the new position, the `(ionItemReorder)` event is
 * emitted. This event provides the initial index (from) and the new index (to) of the reordered
 * item. For example, if the first item is dragged to the fifth position, the event will emit
 * `{from: 0, to: 4}`. Note that the index starts at zero.
 *
 * A function should be called when the event is emitted that handles the reordering of the items.
 * See [usage](#usage) below for some examples.
 *
 *
 * @usage
 *
 * ```html
 * <ion-list>
 *   <ion-list-header>Header</ion-list-header>
 *   <ion-item-group reorder="true" (ionItemReorder)="reorderItems($event)">
 *     <ion-item *ngFor="let item of items">{% raw %}{{ item }}{% endraw %}</ion-item>
 *   </ion-item-group>
 * </ion-list>
 * ```
 *
 * ```ts
 * class MyComponent {
 *   items = [];
 *
 *   constructor() {
 *     for (let x = 0; x < 5; x++) {
 *       this.items.push(x);
 *     }
 *   }
 *
 *   reorderItems(indexes) {
 *     let element = this.items[indexes.from];
 *     this.items.splice(indexes.from, 1);
 *     this.items.splice(indexes.to, 0, element);
 *   }
 * }
 * ```
 *
 * Ionic also provides a helper function called `reorderArray` to
 * reorder the array of items. This can be used instead:
 *
 * ```ts
 * import { reorderArray } from 'ionic-angular';
 *
 * class MyComponent {
 *   items = [];
 *
 *   constructor() {
 *     for (let x = 0; x < 5; x++) {
 *       this.items.push(x);
 *     }
 *   }
 *
 *   reorderItems(indexes) {
 *     this.items = reorderArray(this.items, indexes);
 *   }
 * }
 * ```
 * Alternatevely you can execute helper function inside template:
 *
 * ```html
 * <ion-list>
 *   <ion-list-header>Header</ion-list-header>
 *   <ion-item-group reorder="true" (ionItemReorder)="$event.applyTo(items)">
 *     <ion-item *ngFor="let item of items">{% raw %}{{ item }}{% endraw %}</ion-item>
 *   </ion-item-group>
 * </ion-list>
 * ```
 *
 * @demo /docs/demos/src/item-reorder/
 * @see {@link /docs/components#lists List Component Docs}
 * @see {@link ../../list/List List API Docs}
 * @see {@link ../Item Item API Docs}
 */
export declare class ItemReorder {
    private _rendered;
    private _zone;
    private _content;
    _enableReorder: boolean;
    _visibleReorder: boolean;
    _reorderGesture: ItemReorderGesture;
    _lastToIndex: number;
    _element: HTMLElement;
    /**
     * @output {object} The expression to evaluate when the item is reordered. Emits an object
     * with `from` and `to` properties.
     */
    ionItemReorder: EventEmitter<ReorderIndexes>;
    constructor(elementRef: ElementRef, _rendered: Renderer, _zone: NgZone, _content: Content);
    /**
     * @private
     */
    ngOnDestroy(): void;
    /**
     * @private
     */
    reorder: boolean;
    _reorderPrepare(): void;
    _reorderStart(): void;
    _reorderEmit(fromIndex: number, toIndex: number): void;
    _scrollContent(scroll: number): number;
    _reorderReset(): void;
    _reorderMove(fromIndex: number, toIndex: number, itemHeight: number): void;
    /**
     * @private
     */
    setElementClass(classname: string, add: boolean): void;
    /**
     * @private
     */
    getNativeElement(): HTMLElement;
}
/**
 * @private
 */
export declare class Reorder {
    private item;
    private elementRef;
    constructor(item: ItemReorder, elementRef: ElementRef);
    getReorderNode(): HTMLElement;
    onClick(ev: any): void;
}
/**
 * @private
 */
export declare function findReorderItem(node: any, listNode: any): HTMLElement;
/**
 * @private
 */
export declare function indexForItem(element: any): number;
/**
 * @private
 */
export declare function reorderListForItem(element: any): any;
