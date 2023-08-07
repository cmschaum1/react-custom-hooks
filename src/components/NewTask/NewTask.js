import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "../../hooks/use-http";

const url = "https://react-movies-b6007-default-rtdb.firebaseio.com/tasks.json";

const NewTask = (props) => {
  const { isLoading, error, sendRequest } = useHttp();

  const transformTask = (taskText, taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };

  const enterTaskHandler = async (taskText) => {
    sendRequest(
      {
        url,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { text: taskText },
      },
      transformTask.bind(null, taskText)
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
