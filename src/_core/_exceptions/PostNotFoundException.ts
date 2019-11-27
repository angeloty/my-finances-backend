import HttpException from './HttpException';

class PostNotFoundException extends HttpException {
  constructor(id: any) {
    super(404, `Element with id ${id} not found`);
  }
}

export default PostNotFoundException;
