#pragma once
#include <malloc.h>
#include <random>
#include <math.h>
#include <time.h>

namespace _2048 {

	using namespace System;
	using namespace System::ComponentModel;
	using namespace System::Collections;
	using namespace System::Windows::Forms;
	using namespace System::Data;
	using namespace System::Drawing;

	/// <summary>
	/// Summary for MyForm
	/// </summary>
	public ref class MyForm : public System::Windows::Forms::Form
	{
	public:
		MyForm(void)
		{
			// создаем массив 4x4, выдел€ем пам€ть. “еперь это наша модель данных
			this->model = (unsigned int**) calloc(4, sizeof(unsigned int*));
			for (unsigned int i = 0; i < 4; i++) {
				this->model[i] = (unsigned int*) calloc(4, sizeof(unsigned int));
			}

			// заполн€ем модель данных нул€ми. Ќоль Ч это пуста€ клетка
			for (unsigned int i = 0; i < 4; i++) {
				for (unsigned int j = 0; j < 4; j++) {
					this->model[i][j] = 0;
					this->model[i][j] = pow(2, 1 + ((unsigned int)rand() % 3));
				}
			}

			// перезагружаем генератор псевдослучайных чисел
			srand(time(NULL));

			// выбираем случайные клеточки, чтобы заполнить их степен€ми двойки
			for (unsigned int i = 0; i < 1 + (unsigned int) rand() % 3; i++) {
				for (unsigned int j = 0; j < 1 + (unsigned int) rand() % 3; j++) {

					// выбираем степени двойки, от 2^1 до 2^3
				 	//this->model[i][j] = pow(2, 1 + ((unsigned int) rand() % 3));
				}
			}

			InitializeComponent();

			// отображаем модель данных на экран в самый первый раз
			this->render(this->model);

		}

	protected:
		/// <summary>
		/// Clean up any resources being used.
		/// </summary>
		~MyForm()
		{
			if (components)
			{
				delete components;
			}
		}

	private: System::Windows::Forms::TableLayoutPanel^  tableLayoutPanel1;
	public: System::Windows::Forms::Label^  label16;
	public: System::Windows::Forms::Label^  label15;
	public: System::Windows::Forms::Label^  label14;
	public: System::Windows::Forms::Label^  label13;
	public: System::Windows::Forms::Label^  label12;
	public: System::Windows::Forms::Label^  label11;
	public: System::Windows::Forms::Label^  label10;
	public: System::Windows::Forms::Label^  label9;
	public: System::Windows::Forms::Label^  label8;
	public: System::Windows::Forms::Label^  label7;
	public: System::Windows::Forms::Label^  label6;
	public: System::Windows::Forms::Label^  label5;
	public: System::Windows::Forms::Label^  label4;
	public: System::Windows::Forms::Label^  label3;
	public: System::Windows::Forms::Label^  label2;
	public: System::Windows::Forms::Label^  label1;

	public: System::Void render(unsigned int**);
	private: unsigned int** model;
	

	private:
		/// <summary>
		/// Required designer variable.
		/// </summary>
		System::ComponentModel::Container ^components;

#pragma region Windows Form Designer generated code
		/// <summary>
		/// Required method for Designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
		void InitializeComponent(void)
		{
			this->tableLayoutPanel1 = (gcnew System::Windows::Forms::TableLayoutPanel());
			this->label16 = (gcnew System::Windows::Forms::Label());
			this->label15 = (gcnew System::Windows::Forms::Label());
			this->label14 = (gcnew System::Windows::Forms::Label());
			this->label13 = (gcnew System::Windows::Forms::Label());
			this->label12 = (gcnew System::Windows::Forms::Label());
			this->label11 = (gcnew System::Windows::Forms::Label());
			this->label10 = (gcnew System::Windows::Forms::Label());
			this->label9 = (gcnew System::Windows::Forms::Label());
			this->label8 = (gcnew System::Windows::Forms::Label());
			this->label7 = (gcnew System::Windows::Forms::Label());
			this->label6 = (gcnew System::Windows::Forms::Label());
			this->label5 = (gcnew System::Windows::Forms::Label());
			this->label4 = (gcnew System::Windows::Forms::Label());
			this->label3 = (gcnew System::Windows::Forms::Label());
			this->label2 = (gcnew System::Windows::Forms::Label());
			this->label1 = (gcnew System::Windows::Forms::Label());
			this->tableLayoutPanel1->SuspendLayout();
			this->SuspendLayout();
			// 
			// tableLayoutPanel1
			// 
			this->tableLayoutPanel1->ColumnCount = 4;
			this->tableLayoutPanel1->ColumnStyles->Add((gcnew System::Windows::Forms::ColumnStyle(System::Windows::Forms::SizeType::Percent,
				25)));
			this->tableLayoutPanel1->ColumnStyles->Add((gcnew System::Windows::Forms::ColumnStyle(System::Windows::Forms::SizeType::Percent,
				25)));
			this->tableLayoutPanel1->ColumnStyles->Add((gcnew System::Windows::Forms::ColumnStyle(System::Windows::Forms::SizeType::Percent,
				25)));
			this->tableLayoutPanel1->ColumnStyles->Add((gcnew System::Windows::Forms::ColumnStyle(System::Windows::Forms::SizeType::Percent,
				25)));
			this->tableLayoutPanel1->Controls->Add(this->label16, 3, 3);
			this->tableLayoutPanel1->Controls->Add(this->label15, 2, 3);
			this->tableLayoutPanel1->Controls->Add(this->label14, 1, 3);
			this->tableLayoutPanel1->Controls->Add(this->label13, 0, 3);
			this->tableLayoutPanel1->Controls->Add(this->label12, 3, 2);
			this->tableLayoutPanel1->Controls->Add(this->label11, 2, 2);
			this->tableLayoutPanel1->Controls->Add(this->label10, 1, 2);
			this->tableLayoutPanel1->Controls->Add(this->label9, 0, 2);
			this->tableLayoutPanel1->Controls->Add(this->label8, 3, 1);
			this->tableLayoutPanel1->Controls->Add(this->label7, 2, 1);
			this->tableLayoutPanel1->Controls->Add(this->label6, 1, 1);
			this->tableLayoutPanel1->Controls->Add(this->label5, 0, 1);
			this->tableLayoutPanel1->Controls->Add(this->label4, 3, 0);
			this->tableLayoutPanel1->Controls->Add(this->label3, 2, 0);
			this->tableLayoutPanel1->Controls->Add(this->label2, 1, 0);
			this->tableLayoutPanel1->Controls->Add(this->label1, 0, 0);
			this->tableLayoutPanel1->Location = System::Drawing::Point(12, 12);
			this->tableLayoutPanel1->Name = L"tableLayoutPanel1";
			this->tableLayoutPanel1->RowCount = 4;
			this->tableLayoutPanel1->RowStyles->Add((gcnew System::Windows::Forms::RowStyle(System::Windows::Forms::SizeType::Percent, 25)));
			this->tableLayoutPanel1->RowStyles->Add((gcnew System::Windows::Forms::RowStyle(System::Windows::Forms::SizeType::Percent, 25)));
			this->tableLayoutPanel1->RowStyles->Add((gcnew System::Windows::Forms::RowStyle(System::Windows::Forms::SizeType::Percent, 25)));
			this->tableLayoutPanel1->RowStyles->Add((gcnew System::Windows::Forms::RowStyle(System::Windows::Forms::SizeType::Percent, 25)));
			this->tableLayoutPanel1->Size = System::Drawing::Size(260, 237);
			this->tableLayoutPanel1->TabIndex = 1;
			// 
			// label16
			// 
			this->label16->AutoSize = true;
			this->label16->Dock = System::Windows::Forms::DockStyle::Fill;
			this->label16->FlatStyle = System::Windows::Forms::FlatStyle::Flat;
			this->label16->ForeColor = System::Drawing::Color::Black;
			this->label16->Location = System::Drawing::Point(198, 177);
			this->label16->Name = L"label16";
			this->label16->Size = System::Drawing::Size(59, 60);
			this->label16->TabIndex = 15;
			this->label16->TextAlign = System::Drawing::ContentAlignment::MiddleCenter;
			// 
			// label15
			// 
			this->label15->AutoSize = true;
			this->label15->Dock = System::Windows::Forms::DockStyle::Fill;
			this->label15->FlatStyle = System::Windows::Forms::FlatStyle::Flat;
			this->label15->ForeColor = System::Drawing::Color::Black;
			this->label15->Location = System::Drawing::Point(133, 177);
			this->label15->Name = L"label15";
			this->label15->Size = System::Drawing::Size(59, 60);
			this->label15->TabIndex = 14;
			this->label15->TextAlign = System::Drawing::ContentAlignment::MiddleCenter;
			// 
			// label14
			// 
			this->label14->AutoSize = true;
			this->label14->Dock = System::Windows::Forms::DockStyle::Fill;
			this->label14->FlatStyle = System::Windows::Forms::FlatStyle::Flat;
			this->label14->ForeColor = System::Drawing::Color::Black;
			this->label14->Location = System::Drawing::Point(68, 177);
			this->label14->Name = L"label14";
			this->label14->Size = System::Drawing::Size(59, 60);
			this->label14->TabIndex = 13;
			this->label14->TextAlign = System::Drawing::ContentAlignment::MiddleCenter;
			// 
			// label13
			// 
			this->label13->AutoSize = true;
			this->label13->Dock = System::Windows::Forms::DockStyle::Fill;
			this->label13->FlatStyle = System::Windows::Forms::FlatStyle::Flat;
			this->label13->ForeColor = System::Drawing::Color::Black;
			this->label13->Location = System::Drawing::Point(3, 177);
			this->label13->Name = L"label13";
			this->label13->Size = System::Drawing::Size(59, 60);
			this->label13->TabIndex = 12;
			this->label13->TextAlign = System::Drawing::ContentAlignment::MiddleCenter;
			// 
			// label12
			// 
			this->label12->AutoSize = true;
			this->label12->Dock = System::Windows::Forms::DockStyle::Fill;
			this->label12->FlatStyle = System::Windows::Forms::FlatStyle::Flat;
			this->label12->ForeColor = System::Drawing::Color::Black;
			this->label12->Location = System::Drawing::Point(198, 118);
			this->label12->Name = L"label12";
			this->label12->Size = System::Drawing::Size(59, 59);
			this->label12->TabIndex = 11;
			this->label12->TextAlign = System::Drawing::ContentAlignment::MiddleCenter;
			// 
			// label11
			// 
			this->label11->AutoSize = true;
			this->label11->Dock = System::Windows::Forms::DockStyle::Fill;
			this->label11->FlatStyle = System::Windows::Forms::FlatStyle::Flat;
			this->label11->ForeColor = System::Drawing::Color::Black;
			this->label11->Location = System::Drawing::Point(133, 118);
			this->label11->Name = L"label11";
			this->label11->Size = System::Drawing::Size(59, 59);
			this->label11->TabIndex = 10;
			this->label11->TextAlign = System::Drawing::ContentAlignment::MiddleCenter;
			// 
			// label10
			// 
			this->label10->AutoSize = true;
			this->label10->Dock = System::Windows::Forms::DockStyle::Fill;
			this->label10->FlatStyle = System::Windows::Forms::FlatStyle::Flat;
			this->label10->ForeColor = System::Drawing::Color::Black;
			this->label10->Location = System::Drawing::Point(68, 118);
			this->label10->Name = L"label10";
			this->label10->Size = System::Drawing::Size(59, 59);
			this->label10->TabIndex = 9;
			this->label10->TextAlign = System::Drawing::ContentAlignment::MiddleCenter;
			// 
			// label9
			// 
			this->label9->AutoSize = true;
			this->label9->Dock = System::Windows::Forms::DockStyle::Fill;
			this->label9->FlatStyle = System::Windows::Forms::FlatStyle::Flat;
			this->label9->ForeColor = System::Drawing::Color::Black;
			this->label9->Location = System::Drawing::Point(3, 118);
			this->label9->Name = L"label9";
			this->label9->Size = System::Drawing::Size(59, 59);
			this->label9->TabIndex = 8;
			this->label9->TextAlign = System::Drawing::ContentAlignment::MiddleCenter;
			// 
			// label8
			// 
			this->label8->AutoSize = true;
			this->label8->Dock = System::Windows::Forms::DockStyle::Fill;
			this->label8->FlatStyle = System::Windows::Forms::FlatStyle::Flat;
			this->label8->ForeColor = System::Drawing::Color::Black;
			this->label8->Location = System::Drawing::Point(198, 59);
			this->label8->Name = L"label8";
			this->label8->Size = System::Drawing::Size(59, 59);
			this->label8->TabIndex = 7;
			this->label8->TextAlign = System::Drawing::ContentAlignment::MiddleCenter;
			// 
			// label7
			// 
			this->label7->AutoSize = true;
			this->label7->Dock = System::Windows::Forms::DockStyle::Fill;
			this->label7->FlatStyle = System::Windows::Forms::FlatStyle::Flat;
			this->label7->ForeColor = System::Drawing::Color::Black;
			this->label7->Location = System::Drawing::Point(133, 59);
			this->label7->Name = L"label7";
			this->label7->Size = System::Drawing::Size(59, 59);
			this->label7->TabIndex = 6;
			this->label7->TextAlign = System::Drawing::ContentAlignment::MiddleCenter;
			// 
			// label6
			// 
			this->label6->AutoSize = true;
			this->label6->Dock = System::Windows::Forms::DockStyle::Fill;
			this->label6->FlatStyle = System::Windows::Forms::FlatStyle::Flat;
			this->label6->ForeColor = System::Drawing::Color::Black;
			this->label6->Location = System::Drawing::Point(68, 59);
			this->label6->Name = L"label6";
			this->label6->Size = System::Drawing::Size(59, 59);
			this->label6->TabIndex = 5;
			this->label6->TextAlign = System::Drawing::ContentAlignment::MiddleCenter;
			// 
			// label5
			// 
			this->label5->AutoSize = true;
			this->label5->Dock = System::Windows::Forms::DockStyle::Fill;
			this->label5->FlatStyle = System::Windows::Forms::FlatStyle::Flat;
			this->label5->ForeColor = System::Drawing::Color::Black;
			this->label5->Location = System::Drawing::Point(3, 59);
			this->label5->Name = L"label5";
			this->label5->Size = System::Drawing::Size(59, 59);
			this->label5->TabIndex = 4;
			this->label5->TextAlign = System::Drawing::ContentAlignment::MiddleCenter;
			// 
			// label4
			// 
			this->label4->AutoSize = true;
			this->label4->Dock = System::Windows::Forms::DockStyle::Fill;
			this->label4->FlatStyle = System::Windows::Forms::FlatStyle::Flat;
			this->label4->ForeColor = System::Drawing::Color::Black;
			this->label4->Location = System::Drawing::Point(198, 0);
			this->label4->Name = L"label4";
			this->label4->Size = System::Drawing::Size(59, 59);
			this->label4->TabIndex = 3;
			this->label4->TextAlign = System::Drawing::ContentAlignment::MiddleCenter;
			// 
			// label3
			// 
			this->label3->AutoSize = true;
			this->label3->Dock = System::Windows::Forms::DockStyle::Fill;
			this->label3->FlatStyle = System::Windows::Forms::FlatStyle::Flat;
			this->label3->ForeColor = System::Drawing::Color::Black;
			this->label3->Location = System::Drawing::Point(133, 0);
			this->label3->Name = L"label3";
			this->label3->Size = System::Drawing::Size(59, 59);
			this->label3->TabIndex = 2;
			this->label3->TextAlign = System::Drawing::ContentAlignment::MiddleCenter;
			// 
			// label2
			// 
			this->label2->AutoSize = true;
			this->label2->Dock = System::Windows::Forms::DockStyle::Fill;
			this->label2->FlatStyle = System::Windows::Forms::FlatStyle::Flat;
			this->label2->ForeColor = System::Drawing::Color::Black;
			this->label2->Location = System::Drawing::Point(68, 0);
			this->label2->Name = L"label2";
			this->label2->Size = System::Drawing::Size(59, 59);
			this->label2->TabIndex = 1;
			this->label2->TextAlign = System::Drawing::ContentAlignment::MiddleCenter;
			// 
			// label1
			// 
			this->label1->AutoSize = true;
			this->label1->Dock = System::Windows::Forms::DockStyle::Fill;
			this->label1->ForeColor = System::Drawing::Color::Black;
			this->label1->Location = System::Drawing::Point(3, 0);
			this->label1->Name = L"label1";
			this->label1->Size = System::Drawing::Size(59, 59);
			this->label1->TabIndex = 0;
			this->label1->TextAlign = System::Drawing::ContentAlignment::MiddleCenter;
			// 
			// MyForm
			// 
			this->AutoScaleDimensions = System::Drawing::SizeF(6, 13);
			this->AutoScaleMode = System::Windows::Forms::AutoScaleMode::Font;
			this->ClientSize = System::Drawing::Size(284, 261);
			this->Controls->Add(this->tableLayoutPanel1);
			this->Enabled = false;
			this->FormBorderStyle = System::Windows::Forms::FormBorderStyle::FixedSingle;
			this->MaximizeBox = false;
			this->MinimizeBox = false;
			this->Name = L"MyForm";
			this->ShowIcon = false;
			this->Text = L"2048";
			this->KeyPress += gcnew System::Windows::Forms::KeyPressEventHandler(this, &MyForm::MyForm_KeyPress);
			this->tableLayoutPanel1->ResumeLayout(false);
			this->tableLayoutPanel1->PerformLayout();
			this->ResumeLayout(false);

		}
#pragma endregion


private: System::Void MyForm_KeyPress(System::Object^  sender, System::Windows::Forms::KeyPressEventArgs^  e);
};
}
