import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { validateNewUser } from './users';

if (Meteor.isServer) {
  describe('users', function () {
    it('should allow valid email address', function () {
      const testUser = {
        emails: [
          {
            address: 'Test@example.com'
          }
        ]
      };
      const res = validateNewUser(testUser);
      
      expect(res).toBe(true);
    });
    
    it('should reject invalid email', function() {
      const testUser = {
        emails: [
          {
            address: 'example.com'
          }
        ]
      };
      
      expect(() => {
        validateNewUser(testUser);
      }).toThrow();
    });
    
  });
}



/*
Must us it() function for new test cases - provided by mocha - documentation recommends avoiding arroy functions - group tests together with describe function

expect(func).toBe(result) is identical to an if then check - the error messages are more informational through the expect library - there are many more assertions we can use 

const add = (a, b) => {
  if (typeof b !== 'number') {
    return a + a;
  }
  
  return a + b;
};

const square = (a) => a*a;

describe('add', function() {
  it('should add two numbers', function() {
    const res = add(11, 9);
    
    expect(res).toBe(20);
  });
  
  it('should double a single number', function() {
    const res = add(44);
    
    expect(res).toBe(88);
  });
});

describe('square', function(){
  it('should square a number', function() {
    const res = square(4);
    
    expect(res).toBe(16);
  });  
});
*/



