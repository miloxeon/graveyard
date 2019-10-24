#include "model.h"

model::model()
{
	for (unsigned int i = 0; i < 3; i++) {
		for (unsigned int j = 0; j < 3; j++) {
			this->digits[i][j] = 5;
		}
	}
}

unsigned int** model::getDigits()
{
	return this->digits;
}
