import React from 'react'
import { AppState } from 'store'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Task from 'components/Common/Task'
import { ITaskState } from 'store/tasks/types'
import { dragAndDrop } from 'store/tasks/actions'
import { getKanbanOption } from 'store/show/selectors'
import IconOval from 'components/Common/Icons/Common/Oval'

const variables = {
  color: '#0062ff',
  colorBorder: '#e2e2ea',
  crossSize: 16
}

const Wrapper = styled.div`
  width: ${(props: ITaskWrapperProps) =>
    props.kanbanOption ? '280px' : 'auto'};
`
const Header = styled.div`
  border-radius: 15px 15px 0 0;
  border-top: 1px solid ${variables.colorBorder};
  border-left: 1px solid ${variables.colorBorder};
  border-right: 1px solid ${variables.colorBorder};
  display: flex;
  justify-content: space-between;
`
const Title = styled.span`
  font-size: 16px;
  letter-spacing: 0.1px;
  color: #696974;
  padding: 15px 20px;
`
const More = styled.div`
  padding: 0 20px;
  display: flex;
  align-items: center;
  cursor: not-allowed;
  @media (max-width: 450px) {
    display: none;
  }
`
const TasksWrapper = styled.div`
  height: auto;
  border-left: 1px solid ${variables.colorBorder};
  border-right: 1px solid ${variables.colorBorder};
`
const Cross = styled.div`
  position: absolute;
  left: 50%;
  top: 25%;
  width: ${variables.crossSize}px;
  height: ${variables.crossSize}px;
  :before,
  :after {
    position: absolute;
    left: 0;
    content: '';
    height: ${variables.crossSize}px;
    width: 2px;
    background-color: #92929d;
  }
  :before {
    transform: rotate(90deg);
  }
  :after {
    transform: rotate(180deg);
  }
`
const Button = styled.button`
  height: 35px;
  width: 100%;
  border-radius: 0 0 15px 15px;
  outline: none;
  border: 1px solid ${variables.colorBorder};
  position: relative;
  cursor: not-allowed;
  background-color: white;
  :hover {
    border: 1px dashed ${variables.color};
  }
  :hover ${Cross}:before {
    background-color: ${variables.color};
  }
  :hover ${Cross}:after {
    background-color: ${variables.color};
  }
`

interface ITaskWrapperProps {
  dragAndDrop: typeof dragAndDrop
  data: ITaskState[]
  type: string
  kanbanOption: boolean
}

const Tasks = (props: ITaskWrapperProps): any => {
  return props.data.map((item: ITaskState) => (
    <Task data={item} key={item.id} />
  ))
}

const TaskWrapper: React.FC<ITaskWrapperProps> = props => {
  const onDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    props.dragAndDrop(e, props.type)
  }

  return (
    <Wrapper onDragOver={onDragOver} onDrop={onDrop} {...props}>
      <Header>
        <Title>{props.type}</Title>
        <More>
          <IconOval />
        </More>
      </Header>
      <TasksWrapper>
        <Tasks {...props} />
      </TasksWrapper>
      <Button>
        <Cross />
      </Button>
    </Wrapper>
  )
}

const mapStateToProps = (state: AppState) => ({
  kanbanOption: getKanbanOption(state)
})

export default connect(
  mapStateToProps,
  { dragAndDrop }
)(TaskWrapper)
