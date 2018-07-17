import * as themes from './themes';


const baseStyles = (theme) => {
    return `
    .clickableNode {
        cursor: pointer;
    }
    dom-node-preview .htmlOpenTag {
        color: ${theme.HTML_TAG_COLOR}
    }
    dom-node-preview .tagName {
        color: ${theme.HTML_TAGNAME_COLOR};
        text-transform: ${theme.HTML_TAGNAME_TEXT_TRANSFORM};
    }
    dom-node-preview .htmlAttributeName {
        color: ${theme.HTML_ATTRIBUTE_NAME_COLOR};
    }
    dom-node-preview .htmlAttributeValue {
        color: ${theme.HTML_ATTRIBUTE_VALUE_COLOR};
    }
    dom-node-preview .htmlCloseTag {
        color: ${theme.HTML_TAG_COLOR};
    }
    dom-node-preview .htmlCloseTag.offsetLeft {
        /* hack: offset placeholder */
        margin-left: -${theme.TREENODE_PADDING_LEFT};
    }
    dom-node-preview .htmlCloseTag.tagName {
        color: ${theme.HTML_TAGNAME_COLOR};
        text-transform: ${theme.HTML_TAGNAME_TEXT_TRANSFORM};  
    }
    dom-node-preview .htmlComment {
      color: ${theme.HTML_COMMENT_COLOR};
    }
    dom-node-preview .htmlDoctype {
      color: ${theme.HTML_DOCTYPE_COLOR};
    }
  
    granite-inspector-tree-node .treeArrow {
      display: inline-block;
      user-select: none;
      font-size: ${theme.ARROW_FONT_SIZE};
      margin-right: ${theme.ARROW_MARGIN_RIGHT};
      color: ${theme.ARROW_COLOR};
    }

    granite-inspector-tree-node .treeArrow[expanded] {
      --webkit-transform: rotateZ(90deg);
      --moz-transform: rotateZ(90deg);
      transform: rotateZ(90deg);
    }
    
    granite-inspector-tree-node .treeNodeBase {
        cursor: default;
        box-sizing: border-box;
        list-style: none;
        color: ${theme.BASE_COLOR};
        background-color: ${theme.BASE_BACKGROUND_COLOR};
        line-height: ${theme.TREENODE_LINE_HEIGHT};
        font-family: ${theme.TREENODE_FONT_FAMILY};
        font-size: ${theme.TREENODE_FONT_SIZE};
    }
    granite-inspector-tree-node .treeNodePreviewContainer {
    }
    granite-inspector-tree-node .treeNodePlaceholder {
        white-space: pre;
        user-select: none;
        font-size: ${theme.ARROW_FONT_SIZE}
        margin-right: ${theme.ARROW_MARGIN_RIGHT};
    }
    granite-inspector-tree-node .treeNodeChildNodesContainer {
        display: none;
        margin: 0;
        padding-left: ${theme.TREENODE_PADDING_LEFT};
    }
    granite-inspector-tree-node .treeNodeChildNodesContainer[expanded] {
        display: block;
    }


    granite-inspector-object-name  {
        color: ${theme.OBJECT_NAME_COLOR};
    }
    granite-inspector-object-name.dimmed {
        opacity: 0.6;
    }
    granite-inspector-object-value .objectValueNull {
        color: ${theme.OBJECT_VALUE_NULL_COLOR};
    }
    granite-inspector-object-value .objectValueUndefined {
        color: ${theme.OBJECT_VALUE_UNDEFINED_COLOR};
    }
    granite-inspector-object-value .objectValueRegExp {
        color: ${theme.OBJECT_VALUE_REGEXP_COLOR};
    }
    granite-inspector-object-value .objectValueString {
        color: ${theme.OBJECT_VALUE_STRING_COLOR};
    }
    granite-inspector-object-value .objectValueSymbol {
        color: ${theme.OBJECT_VALUE_SYMBOL_COLOR};
    }
    granite-inspector-object-value .objectValueNumber {
        color: ${theme.OBJECT_VALUE_NUMBER_COLOR};
    }
    granite-inspector-object-value .objectValueBoolean {
        color: ${theme.OBJECT_VALUE_BOOLEAN_COLOR};
    }
    granite-inspector-object-value .objectValueFunctionKeyword {
        color: ${theme.OBJECT_VALUE_FUNCTION_KEYWORD_COLOR};
        font-style: italic;
    }
    granite-inspector-object-value .objectValueFunctionName {
        font-style: italic;
    }

    granite-inspector-object-label div {
        display: flex;
        flex-flow: row wrap;
    }

    granite-inspector-object-preview {
        font-style: italic;
    }

    granite-inspector-object-preview,
    granite-inspector-object-value  {
        font-size: 0px;
    }
    granite-inspector-object-preview span,
    granite-inspector-object-value span {
        font-size: ${theme.TREENODE_FONT_SIZE};
    }

    table-inspector  {
        line-height: 120%;
        box-sizing: border-box;
        cursor: default;
        position: relative;
        border: 1px solid ${theme.TABLE_BORDER_COLOR};
        color: ${theme.BASE_COLOR};
        font-family: ${theme.BASE_FONT_FAMILY};
        font-size: ${theme.BASE_FONT_SIZE};
    }
  
    table-inspector-header-container {
        top: 0;
        height: 17px;
        left: 0;
        right: 0;
        overflow-x: hidden;
    }

    table {
        table-layout: fixed;
        border-spacing: 0;
        border-collapse: separate;
        height: 100%;
        width: 100%;
        margin: 0;
    }
  

    table-inspector-data-container tr {
        display: table-row;
    }
    table-inspector-data-container td {
      box-sizing: border-box;
      border: none; 
      height: 16px; /* 0.5 * table.background-size height */
      vertical-align: top;
      padding: 1px 4px;

      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      line-height: 14px;
    }
    table-inspector-data-container div {
      position: static;
      top: 17px;
      bottom: 0;
      overflow-y: overlay;
      transform: translateZ(0);

      left: 0;
      right: 0;
      overflow-x: hidden;
    }
    table-inspector-data-container table {
      position: static;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      border-top: 0 none transparent;
      margin: 0;
      width: 100%;
      table-layout: fixed;
      border-spacing: 0;
      border-collapse: separate;
      line-height: 120%;
      background-image: ${theme.TABLE_DATA_BACKGROUND_IMAGE};
      background-size: ${theme.TABLE_DATA_BACKGROUND_SIZE};
      font-size: ${theme.BASE_FONT_SIZE};
    }
  

    table-inspector-th {
      position: relative;
      height: auto;
      text-align: left;
      font-weight: normal;
      vertical-align: middle;
      padding: 0 4px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      line-height: 14px;
      background-color: ${theme.TABLE_TH_BACKGROUND_COLOR};
      border-bottom: 1px solid ${theme.TABLE_BORDER_COLOR};
    }

    table-inspector-th:hover {
      background-color: ${theme.TABLE_TH_HOVER_COLOR};
    }

    table-inspector-th  div {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      line-height: 120%;
      font-size: ${theme.BASE_FONT_SIZE};
    }
  
    table-inspector-left-border.none {
        border-left: none;
    }

    table-inspector-left-border.solid {
        border-left: 1px solid ${theme.TABLE_BORDER_COLOR};
    }

    table-inspector-sort-icon {
      display: block;
      margin-right: 3; 
      width: 8;
      height: 7;

      margin-top: -7;
      font-size: 12px;
      user-select: none;
      color: ${theme.TABLE_SORT_ICON_COLOR};
    }


`;
};

const styles = Object.keys(themes)
    .reduce((styles, themeName) => {
        styles[themeName] = baseStyles(themes[themeName]);
        return styles;
    }, {});
export default styles;

export { baseStyles as createStyles };
