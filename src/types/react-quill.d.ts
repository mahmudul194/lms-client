declare module 'react-quill' {
  import * as React from 'react';

  export interface ReactQuillProps {
    value?: string;
    defaultValue?: string;
    readOnly?: boolean;
    theme?: string;
    modules?: any;
    formats?: string[];
    bounds?: string | HTMLElement;
    placeholder?: string;
    preserveWhitespace?: boolean;
    onChange?: (
      content: string,
      delta: any,
      source: string,
      editor: any
    ) => void;
    onChangeSelection?: (
      range: any,
      source: string,
      editor: any
    ) => void;
    onFocus?: (
      range: any,
      source: string,
      editor: any
    ) => void;
    onBlur?: (
      previousRange: any,
      source: string,
      editor: any
    ) => void;
    onKeyPress?: React.EventHandler<any>;
    onKeyDown?: React.EventHandler<any>;
    onKeyUp?: React.EventHandler<any>;
    className?: string;
    style?: React.CSSProperties;
    id?: string;
    tabIndex?: number;
  }

  export default class ReactQuill extends React.Component<ReactQuillProps> {}
}
