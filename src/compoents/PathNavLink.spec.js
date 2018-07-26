/* global describe, it, expect */
import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'dva/router';
import PathNavLink from './PathNavLink';

describe('PathNavLink', () => {
  it('it should has active class when current location.pathname equal path', () => {
    const link = mount(
      <MemoryRouter initialEntries={['/foo']}>
        <PathNavLink to="/some" path="/foo" />
      </MemoryRouter>,
    );
    expect(link.find('a').hasClass('active')).toBe(true);
  });
  it('it has not active class when  current location.pathname not equal path', () => {
    const link = mount(
      <MemoryRouter initialEntries={['/foo']}>
        <PathNavLink to="/some" path="/bar" />
      </MemoryRouter>,
    );
    expect(link.find('a').hasClass('active')).toBe(false);
  });
  it('sets active passed value when pathname has trailing slash', () => {
    const link = mount(
      <MemoryRouter initialEntries={['/foo/']}>
        <PathNavLink to="/some" path="/foo" />
      </MemoryRouter>,
    );
    expect(link.find('a').hasClass('active')).toBe(true);
  });
  it('sets active passed value when pathname contain path', () => {
    const link = mount(
      <MemoryRouter initialEntries={['/foo/bar']}>
        <PathNavLink to="/some" path="/foo" />
      </MemoryRouter>,
    );
    expect(link.find('a').hasClass('active')).toBe(true);
  });
});
