import { renderHook } from '@testing-library/react';
import { useDocumentTitle } from '../src';

describe('useDocumentTitle test:', () => {
  beforeEach(() => {
    document.title = 'initial';
  });

  it('should change the title of the document', () => {
    renderHook(() => useDocumentTitle('test'));

    expect(document.title).toEqual('test');
  });

  it('should restore the initial title when unmounting', () => {
    const { unmount } = renderHook(() => useDocumentTitle('test'));

    expect(document.title).toEqual('test');
    unmount();
    expect(document.title).toEqual('initial');
  });

  it('should not restore the initial title when unmounting.', () => {
    const { unmount } = renderHook(() => useDocumentTitle('test', false));

    expect(document.title).toEqual('test');
    unmount();
    expect(document.title).toEqual('test');
  });
});
