import UppyUploader from './components/organisms/UppyUploader';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          Sheet Uploader
        </h1>
        <UppyUploader />
      </div>
    </div>
  );
}

export default App;