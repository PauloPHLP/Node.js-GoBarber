interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: 'ethereal',
  defaults: {
    from: {
      email: 'plima.himself@gmail.com',
      name: 'Paulo Lima',
    },
  },
} as IMailConfig;
