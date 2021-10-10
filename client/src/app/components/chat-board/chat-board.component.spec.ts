import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { MessageService } from 'src/app/providers/messages.service';
import { messageMock } from 'src/testing/messageMock';
import { getElement, getElements } from 'src/testing/utils/elements';

import { ChatBoardComponent } from './chat-board.component';

describe('ChatBoardComponent', () => {
  let component: ChatBoardComponent;
  let fixture: ComponentFixture<ChatBoardComponent>;
  let componentElement: HTMLElement;
  let msgService: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ChatBoardComponent
      ],
      providers: [
        {
          provide: MessageService,
          useValue: {
            socket$: new BehaviorSubject(messageMock)
          }
        }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(ChatBoardComponent);
      msgService = TestBed.inject(MessageService);
      component = fixture.componentInstance;
      componentElement = fixture.nativeElement;
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate message in component element', () => {
    fixture.detectChanges();
    expect(getElement(componentElement, 'nb-chat-message')).toBeTruthy();
  });

  it('should populate multiple messages in component element', () => {
    msgService.socket$.next([messageMock, messageMock]);
    fixture.detectChanges();
    expect(getElements(componentElement, 'nb-chat-message').length).toBe(2);
  });

  it('should emit new message on submit', () => {
    const spy = spyOn(msgService.socket$, 'next');
    fixture.detectChanges();
    component.sendMessage({ message: 'test' });
    expect(spy).toHaveBeenCalledWith({ 
      type: 'chat-message',
      data: {
        userName: component.userName,
        text: 'test'
      }
    });
  });
});
