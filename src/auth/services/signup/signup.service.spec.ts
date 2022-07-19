import { Test, TestingModule } from '@nestjs/testing';
import { SignUpService } from './signup.service';

describe('SignupService', () => {
  let service: SignUpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SignUpService],
    }).compile();

    service = module.get<SignUpService>(SignUpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
